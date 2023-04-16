package com.capstone.design;

import org.apache.coyote.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MenuController {
    private MenuService service = MenuService.getInstance();

    public MenuController(MenuService service){
        this.service=service;
    }

    // 요청 테스트
    @CrossOrigin  // CORS 문제 해결을 위함.
    @PostMapping(path = "/test")
    public ResponseEntity<String> requestTestMethod(@RequestBody String s) {
        String message = s;
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 손님 - 메뉴 확인
    @CrossOrigin
    @GetMapping(path="/getMenu")
    public List<Menu> retrieveAllUsers(){
        return service.findAll();
    }
    
    // 손님 - 메뉴 주문
    @CrossOrigin
    @PostMapping(path = "/order")
    public String orderMenu(@RequestBody Order order){
        return service.orderMenu(order);
    }

    // 사장 - 메뉴 추가
    @CrossOrigin
    @PostMapping(path="/addMenu")
    public ResponseEntity<Menu> addMenu(@RequestBody Menu menu){
        System.out.println("menu = " + menu);
        Menu savedMenu = service.save(menu);

        return new ResponseEntity<>(menu, HttpStatus.OK);
    }

    // 사장 - 메뉴 삭제, 현재 동작 안 됨
    @CrossOrigin
    @DeleteMapping(path="/deleteMenu/{foodName}")
    public ResponseEntity<String> deleteMenu(@PathVariable String foodName){
        String deletedMenu = service.deleteByFood(foodName);
        if(deletedMenu==null){
            return new ResponseEntity<>(foodName, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(foodName, HttpStatus.OK);
    }



    /*  MVC 모델로 SSR 할 때 필요한 view 메소드. 하지만 현재는 서버를 쪼개서 CSR로 개발하여 프론트엔드 서버에서 view로 제공하므로 사용하지 않는다.
    @GetMapping(path = "index")
    public String index(Model model){
        model.addAttribute("message", "Hello Thymeleaf");
        return "index";
    }

    @GetMapping("hello")
    public String hello(Model model) {
        model.addAttribute("message", "Hello Thymeleaf");
        return "hello"; // this should match the name of your HTML file
    }
    */
}
