package com.example.demo;

public class User {
	
	private String nick;
	private int victories;
	private String password;
	
	
	public User() {}
	
	public User(String _nick, String _password) 
	{
		this.nick = _nick;
		this.victories = 0;
	    this.password = _password;
	}
	
	public void setNick(String _nick) 
	{
		this.nick = _nick;
	}
	
	public String getNick()
	{
        return this.nick;
	}
	
	public void setVictories(int _victories) 
	{
        this.victories = _victories;
    }
	    
    public int getVictories(){
        return this.victories;
    }
	    
    public void getPassword(String _password) {
        this.password = _password;
    }
    
    public String getPassword(){
        return this.password;
    }
	
}
