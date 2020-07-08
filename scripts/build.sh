#! /bin/bash
FPWD=`cd $(dirname "$0");pwd`
# echo $FPWD
BASE_PATH=$FPWD/../
PAGE_BASE_PATH=$BASE_PATH/page
SERVER_BASE_PATH=$BASE_PATH/server
cd $BASE_PATH

installdepends() {
    cd $PAGE_BASE_PATH && npm i 1>/dev/null 
    cd $SERVER_BASE_PATH && npm i 1>/dev/null 
}
buildweb() {
    pushd . 1>/dev/null 2>&1 
    cd $PAGE_BASE_PATH
    npm run build 1>/dev/null
    popd 1>/dev/null 2>&1
}

cp2server() {
    pushd . 1>/dev/null 2>&1
    cp -R $PAGE_BASE_PATH/dist/* $SERVER_BASE_PATH/public/app 1>/dev/null
    popd 1>/dev/null 2>&1
}
installdepends
buildweb
cp2server
