#! /bin/bash
FPWD=`cd $(dirname "$0");pwd`
echo $FPWD
BASE_PATH=$FPWD/../
PAGE_BASE_PATH=$BASE_PATH/page
SERVER_BASE_PATH=$BASE_PATH/server
cd $BASE_PATH

cd $SERVER_BASE_PATH/ && npm start