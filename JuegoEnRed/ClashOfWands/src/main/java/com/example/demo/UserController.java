package com.example.demo;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.io.*;
import java.util.Scanner;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UserController {
	
	private Map<String, User> users = new HashMap<String, User>();
	
	private Map<String, User> activeUsers = new HashMap<String, User>();
	
	String usersFileURL = "src/main/resources/static/db/users.txt"; // Files users
	String tempUsersFileURL = "src/main/resources/static/db/tempUsers.txt"; // File used to delete one user
	
	public UserController() 
	{
		try 
		{
			File obj = new File(usersFileURL);
			Scanner reader = new Scanner(obj);
			
			while (reader.hasNextLine()) {
				//Creamos usuario temporal desde el txt
				String data[] = reader.nextLine().split(";");
				User auxUser = new User(data[0], data[1]);
				auxUser.setVictories(Integer.parseInt(data[2]));
				users.put(auxUser.getNick(), auxUser);
				
			}
			reader.close();
			
		}catch(FileNotFoundException e) 
		{
			System.out.println("Error reading the users");
			e.printStackTrace();
		}
	}
	
	
	@GetMapping("/users")
	public Map<String, User> getUsers(){
		return users;
	}
	
	@GetMapping("/activeUsers")
	public Map<String, User> getActiveUsers(){
		return activeUsers;
	}
	
	@GetMapping("/activeUsersNum")
	public int getActiveUsersNum() {
    	return activeUsers.size();
    }
	
	@GetMapping("/users/{nickname}")
	public User getUser(@PathVariable("nickname") String nickname) {
		if (users.containsKey(nickname)) 
		{
			User user = users.get(nickname);
			
			return user;
		}
		else 
		{
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found");
		}
	}
	
	@PostMapping("/activeUsers")
	public boolean addCurrentUser(@RequestBody User newUser) 
	{
		String nickname = newUser.getNick(); //Usamos el nombre como clave
		
		activeUsers.put(nickname, newUser);
		
		return true;
	}
	
	@PostMapping("/users")
    public boolean addUser(@RequestBody User newUser) 
    {
    	String nickname = newUser.getNick();	// Uses the user nick as key
    	String password = newUser.getPassword();
    	System.out.println(nickname);
    	if(!users.containsKey(nickname)) // if the user doesn't exist
    	{
    		users.put(nickname, newUser); // we add the new user
    		activeUsers.put(nickname, newUser);
    		
    		// Add user to the txt file
            try (Writer writer = new BufferedWriter(new FileWriter(usersFileURL, true))) // "true" parameter is for appending
            {
                String contents = "";
                contents = newUser.getNick() + ";" + newUser.getPassword() + ";" + newUser.getVictories() + System.getProperty("line.separator");
                
                writer.write(contents);
                writer.close();
                System.out.println("User written succesfully");
                
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("Error writing user");
            }
        	

    		return true; // we create the user and continue to the next scene
    		
    	} else { // the user exists
    		if(users.get(nickname).getPassword().equals(password)) { // if the password given matches the stored one
    	    	activeUsers.put(nickname, newUser);

    			return true; // we can change the scene
    		} else // if the password isn't the same
    			return false; // we can't change the scene
    	}
    		
    	
    }
	
	@DeleteMapping("/activeUsers")
    public void closeSession(@PathVariable("nick") String nick)throws IOException{
 	   if(activeUsers.containsKey(nick)) {
 		   activeUsers.remove(nick);
 		   System.out.println("Un usuario se ha desconectado.");
 	   }
    }
	
	@DeleteMapping("/activeUsers/{nick}")
   	public void deleteCurrentUser(@PathVariable("nick") String nick)throws IOException{
	   if(activeUsers.containsKey(nick)) {
		   activeUsers.remove(nick);
		   System.out.println("Un usuario se ha desconectado.");
	   }
   }
	    
	@DeleteMapping("/users/{nick}")
	public void deleteUser(@PathVariable("nick") String nick) throws IOException {
	   
	   /*
	    * This method deletes the user in the .txt file by creating a
	    * new file to write the users that are NOT deleted,
	    * then deletes the old users file and uses the new
	   */
	   
	   if(users.containsKey(nick))
	   {
		   User deleteUser = users.get(nick); // The user to delete
		   
		   File inputFile = new File(usersFileURL);
		   File tempFile = new File(tempUsersFileURL);
	
		   BufferedReader reader = new BufferedReader(new FileReader(inputFile));
		   BufferedWriter writer = new BufferedWriter(new FileWriter(tempFile));
	
		   String lineToRemove = deleteUser.getNick() + ";" + deleteUser.getPassword() + ";" + deleteUser.getVictories();
		   String currentLine;
	
		   while((currentLine = reader.readLine()) != null) {
		       // trim newline when comparing with lineToRemove
		       String trimmedLine = currentLine.trim();
		       
		       if(trimmedLine.equals(lineToRemove)) 
		    	   continue;
		       
		       writer.write(currentLine + System.getProperty("line.separator"));
		   }
		   writer.close(); 
		   reader.close();
		   
		   inputFile.delete();
		   boolean successful = tempFile.renameTo(inputFile);
		   
		   activeUsers.remove(nick);
		   
		   users.remove(nick);
	   }
	}
	
}
