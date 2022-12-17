# OneDep-registry
```text
OneDep의 Registry 서비스입니다.
```

## OneDep을 찾아오셨나요?
이 Repository는 OneDep 실행 시 코드를 보관하는 Registry 서비스입니다.\
서비스를 배포하는 OneDep-cli를 찾으신다면 [여기를](https://github.com/runasy-koonta/onedep-cli) 방문해주세요. 

## Installation
### Requirements
- [Docker](https://docs.docker.com/install/) - 아래 커맨드를 통해 설치됩니다.

### Install
```bash
# 아래 커맨드 중 일부는 root에서 실행되어야 합니다.
$ yum update -y

# epel-release repo를 설치합니다.
$ wget -r --no-parent -A 'epel-release-*.rpm' https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/
$ rpm -Uvh dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-*.rpm
$ yum-config-manager --enable epel*
$ amazon-linux-extras install epel -y

# Docker와 Certbot을 설치합니다.
$ yum install -y docker certbot python2-certbot-apache
$ service docker start
$ usermod -aG docker ec2-user
$ docker pull registry

# Certbot을 실행합니다.
$ certbot certonly --standalone

# 발급받은 인증서를 이동합니다.
$ cd /etc/letsencrypt/live/[도메인]/
$ cp privkey.pem domain.key
$ cat cert.pem chain.pem > domain.crt
$ chmod 777 domain.crt
$ chmod 777 domain.key

$ cd
$ mkdir auth
$ touch auth/htpasswd

# Registry를 설치합니다.
$ docker run -d -p 5000:5000 --restart=always --name registry \
  -v /etc/letsencrypt/live/[도메인]:/certs \
  -v /opt/docker-registry:/var/lib/registry \
  -v `pwd`/auth:/auth \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=OneDep Docker Registry" \
  -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \
  -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
  -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
  registry:2
```

## Usage
PM2등을 활용해 Registry 서버를 구동하세요.
```bash
$ pm2 start index.js
```

## Roadmap
- [ ] Web에서 프로젝트를 관리할 수 있도록 합니다.
- [ ] HTTPS 지원을 추가합니다.

## Contacts
- [Minjun Kang](https://github.com/runasy-koonta) ([minjun@kaaang.dev](mailto:minjun@kaaang.dev))
