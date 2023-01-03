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
		ObjectNode playerNode = mapper.createObjectNode();

		newNode.put("id", node.get("id").asInt());
		newNode.put("visibleCharacter", node.get("visibleCharacter").asBoolean());
		newNode.put("frameCharacter", node.get("frameCharacter").asInt());
		newNode.put("text", node.get("text").asInt());
		newNode.put("ready", node.get("ready").asInt());
		newNode.put("type", node.get("type"));

		playerNode.put("id",node.get("id").asInt;
		playerNode.put("positionX",node.get("positionX").asInt;
		playerNode.put("positionY",node.get("positionY").asInt;
		playerNode.put("isAttacking",node.get("isAttacking").asBoolean;

		for(WebSocketSession participant: sessions.values()) 
		{
			if(!participant.getId().equals(session.getId())) 
			{
				participant.sendMessage(new TextMessage(newNode.toString()));
				participant.sendMessage(new TextMessage(playerNode.toString()));
			}
		}
	}
	
}
