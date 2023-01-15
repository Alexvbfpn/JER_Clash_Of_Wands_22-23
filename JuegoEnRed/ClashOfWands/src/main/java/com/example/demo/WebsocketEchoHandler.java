package com.example.demo;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import org.springframework.web.socket.WebSocketSession;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;

public class WebsocketEchoHandler extends TextWebSocketHandler{

	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private int maxOnline = 2;
	private ObjectMapper mapper = new ObjectMapper();
	//Notify a connection
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception 
	{
		System.out.println("New session" + session.getId());
		sessions.put(session.getId(), session);
	}
	//Notify a disconnection 
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception 
	{
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception 
	{
		JsonNode node = mapper.readTree(message.getPayload());
		sendOtherParticipants(session, node);
	}
	
	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException 
	{
		ObjectNode newNode = mapper.createObjectNode();
		
		if(node.get("id")!= null) 
		{
				newNode.put("id", node.get("id").asInt());
		}
		if(node.get("visibleCharacter")!= null) 
		{
				newNode.put("visibleCharacter", node.get("visibleCharacter").asBoolean());
		}
		if(node.get("frameCharacter")!= null) 
		{
				newNode.put("frameCharacter", node.get("frameCharacter").asInt());
		}
		if(node.get("text")!= null) 
		{
				newNode.put("text", node.get("text").asInt());
		}
		if(node.get("ready")!= null) 
		{
				newNode.put("ready", node.get("ready").asInt());
		}
		if(node.get("Lready")!= null) 
		{
				newNode.put("Lready", node.get("Lready").asInt());
		}
		if(node.get("type")!= null) 
		{
				newNode.put("type", node.get("type"));
		}
		if(node.get("animationFrame")!= null) 
		{
				newNode.put("animationFrame", node.get("animationFrame").asInt());
		}
		if(node.get("positionX")!= null) 
		{
				newNode.put("positionX",node.get("positionX").asInt());
		}
		if(node.get("positionY")!= null) 
		{
				newNode.put("positionY",node.get("positionY").asInt());
		}
		if(node.get("isAttacking")!= null) 
		{
				newNode.put("isAttacking",node.get("isAttacking").asBoolean());
		}
		if(node.get("rotation")!=null) 
		{
				newNode.put("rotation",node.get("rotation").asInt());
		}
		if(node.get("cell0")!=null) 
		{
				newNode.put("cell0",node.get("cell0").asInt());
		}
		if(node.get("cell1")!=null) 
		{
				newNode.put("cell1",node.get("cell1").asInt());
		}
		if(node.get("cell2")!=null) 
		{
				newNode.put("cell2",node.get("cell2").asInt());
		}
		if(node.get("cell3")!=null) 
		{
				newNode.put("cell3",node.get("cell3").asInt());
		}
		if(node.get("cell4")!=null) 
		{
				newNode.put("cell4",node.get("cell4").asInt());
		}
		if(node.get("cell5")!=null) 
		{
				newNode.put("cell5",node.get("cell5").asInt());
		}
		for(WebSocketSession participant: sessions.values()) 
		{
			if(!participant.getId().equals(session.getId())) 
			{
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}
	
}
