# ShareIt
Comp 512 project - Shared text editor
ShareIt - collaborative text editor is similar to the note pad on the desktop, with an additional feature that this can be shared with multiple users spread across the world.

#Deployment Steps:
	*	Update the IP of the machine in shareit/src/main/webapp/js/properties.js file in line 1.
			var baseUrl = "http://<YOUR IP HERE>:8080/shareit/services/";
	* run mvn clean install command 
	* shareit.war file gets generated under shareIt/target folder.
	* To deploy it in Apache Tomcat:
		*	Copy shareit.war to webapps folder and restart the Tomcat.
		*	restart Tomcat.
		*	URL: http://<IP HERE>:8080/shareit/
