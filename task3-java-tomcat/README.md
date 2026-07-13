# Task 3: Java Web Application on Apache Tomcat

## Tech Stack
- Java 21
- Maven
- Apache Tomcat 10.1
- WSL Ubuntu

## Steps
1. Created Maven Web Application
2. Created HelloServlet
3. Configured web.xml
4. Built WAR using:

```bash
mvn clean package
```

5. Deployed WAR to:

```
/opt/tomcat/webapps/
```

6. Tested using:

```
curl http://localhost:8080/hello-webapp/hello
```

Output:

```
Hello Yeshfa!
Java Web Application Successfully Deployed on Tomcat
```
