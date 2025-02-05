package com.iongroup.dbx.share.demowebsocket.controllers.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/home")
public class HelloController {
  @GetMapping("/say-hello")
  public String sayHello() {
    return "Hello!";
  }
}
