-- CREATE DATABASE "typescript_dev";

\connect typescript_dev

create user testuser with encrypted password 'testpw';

grant all privileges on database typescript_dev to testuser;