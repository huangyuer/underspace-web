FROM centos
WORKDIR /engineering-web
ADD . /engineering-web
# RUN yum groupinstall 'Development Tools' -y
# RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.2/install.sh | bash
# ENV NVM_DIR /root/.nvm
# ENV NODE_VERSION 8.10.0
# RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
# RUN source $NVM_DIR/nvm.sh \
#     && nvm install $NODE_VERSION \
#     && nvm alias default $NODE_VERSION \
#     && nvm use default
# ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
# ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
# RUN node -v
# RUN npm -v   
# RUN npm install
# RUN npm run build
RUN yum install epel-release -y
RUN yum install nginx -y
# RUN nginx 
# RUN nginx -v
EXPOSE 8088
CMD ["npm","run","dev"]
#RUN systemctl start nginx
# RUN . $NVM_DIR/nvm.sh && nvm install 8.10.0
#RUN . $NVM_DIR/nvm.sh && node --version
#RUN  cd ~ && ls -alh
#RUN curl --silent --location https://rpm.nodesource.com/setup_8.x |  bash -
#RUN yum -y install nodejs
# install nvm
# https://github.com/creationix/nvm#install-script 