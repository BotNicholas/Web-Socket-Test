package com.iongroup.dbx.share.demowebsocket.controllers.websocket;

import com.iongroup.dbx.share.demowebsocket.models.Greeting;
import com.iongroup.dbx.share.demowebsocket.models.HelloMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

  private SimpMessagingTemplate template;

  @Autowired
  public GreetingController(SimpMessagingTemplate template) {
    this.template = template;
  }

//  FOR SIMPLE MESSAGING
//  @MessageMapping("/hello")
//  @SendTo("/topic/greetings")
//  public Greeting greeting(HelloMessage message) throws Exception {
//    Thread.sleep(1000); // simulated delay
//    return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
//}


  // FOR DYNAMIC MESSAGES TOPICS
  @MessageMapping("/hello")
  public void greeting(HelloMessage message) throws Exception {
    Thread.sleep(1000); // simulated delay

    this.template.convertAndSend("/topic/greetings/" + 1, new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!"));
  }
}
