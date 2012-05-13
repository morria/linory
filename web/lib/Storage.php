<?php

require_once 'sdk.class.php';

class Storage {
    const STATUS_OK = 200;
    const BUCKET_NAME = 'sketches.linory.com';

    private $amazonS3 = null;


    public function __construct() {
        $this->amazonS3 = new AmazonS3(); 
        $this->amazonS3->disable_ssl_verification(false);
        header('Content-type: application/json');
    }

    private function reply($status, $map) {
        if($status != 200) {
            header('HTTP/1.0 ' . $status);
        }
        print json_encode($map);
        exit;
    }

    private function getFilenameForId($id) {
        return wordwrap($id, 2, "/", true).'.json';
    }

    /**
     * Store an object
     */
    public function put($id) {
        $blob = file_get_contents("php://input");

        // Don't store anything if we don't have data
        if(strlen($blob) < 1 ||
           strlen($blob) > 1048576) {
            $this->reply(500, array('id' => $id, 'success' => false));
        }

        $filename = $this->getFilenameForId($id);

        $response =
            $this->amazonS3->create_object(self::BUCKET_NAME,
                $filename,
                array('body' => $blob,
                      'contentType' => 'application/json'));

        if($response->status != 200) {
            $this->reply($response->status,
                array('id' => $id, 'success' => false, 'response' => $response));
        }
        else {
            $this->reply(self::STATUS_OK,
                array('id' => $id, 'success' => true, 'response' => $response, 'filename' => $filename));
        }
    }

    public function getData($id) {
        $response =
            $this->amazonS3->get_object(self::BUCKET_NAME,
                $this->getFilenameForId($id));

        if($response->status != 200) {
            return null;
        }

        return json_decode($response->body);
    }

    /**
     * Get an object
     */
    public function get($id) {
        $response =
            $this->amazonS3->get_object(self::BUCKET_NAME,
                $this->getFilenameForId($id));

        if($response->status != 200) {
            $this->reply($response->status,
                array('id' => $id, 'success' => false));
        }

        $this->reply(self::STATUS_OK, json_decode($response->body));
    }
}
