FROM testcafe/testcafe
USER root
COPY package*.json ./
RUN  npm install
RUN mkdir screenshots
RUN chmod a=rwx screenshots
USER root
