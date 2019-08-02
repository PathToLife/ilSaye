Useful notes from [nodejs.org](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/)

[DockerCli Docs](https://docs.docker.com/engine/reference/commandline/docker/)
    
    # run in daemon background
    $ docker run -p <public port>:8080 -d <image tag>
    
    # open shell to container
    $ docker exec -it <container id> /bin/bash
    
    # Get container ID
    $ docker ps
    
    # Print app output
    $ docker logs <container id>
    
    # Stop Running Container
    $ docker stop <container id>
    
    # Remove unused containers:
    $ docker system prune
    

Relational DB in docker:

https://hub.docker.com/_/mysql
    