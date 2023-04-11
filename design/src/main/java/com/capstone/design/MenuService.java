package com.capstone.design;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MenuService {
    private static List<Menu> menuList = new ArrayList<>(); // 메뉴판 DB
    private static int menuCount=3;
    static {
        menuList.add(new Menu(1, "김치볶음밥", 8000));
        menuList.add(new Menu(2, "떡볶이", 7000));
        menuList.add(new Menu(3, "자장면", 6000));
    }

    private static Map<String, Integer> orderedMenu = new HashMap<String, Integer>();  // 손님이 주문한 메뉴 구성 DB <음식 이름, 음식 개수>.
      // 음식 가격의 경우는 따로 DB에서 내부적으로 관리할 생각이다. 이 데이터는 외부에서 받을 필요가 없으니까.


    // 손님 - 메뉴 확인
    public List<Menu> findAll() {

        return menuList;
    }

    // 손님 - 메뉴 주문
    public String orderMenu(Order order){
        /* 예상 요청 메세지 JSON 형식
        {
            "foodName" : ["김치볶음밥", "자장면"],
            "numberOfFood" : [2, 1]
        }
        */

        // 주문한 메뉴 목록과 개수를 각각 분리
        List<String> orderMenuList = new ArrayList<>();
        List<Integer> numberOfFoodList = new ArrayList<>();

        for (String name : order.getFoodName()){
            orderMenuList.add(name);  // ["김치볶음밥", "자장면"]
        }
        for (Integer number : order.getNumberOfFood()){
            numberOfFoodList.add(number); // [2, 1]
        }

        for (int i = 0; i<orderMenuList.size();i++){
            orderedMenu.put(orderMenuList.get(i), numberOfFoodList.get(i));  // {자장면=1, 김치볶음밥=2}
        }

        /* 리스트 안에서 특정 문자열을 찾고자 하는 경우.
        List<Customer> customers = new ArrayList<>();
        // add customers to the list
        Optional<Customer> james = customers.stream()
                .filter(customer -> "James".equals(customer.getName()))
            .findAny();
         */

        /* Map 안에서 키와 벨류를 찾고자 하는 경우.
        Map<String, Integer> map = new HashMap<>();
        map.put("apple", 10);
        map.put("banana", 5);

        for (int value : map.values()) {  // 모든 벨류를 순차적으로 반환
            System.out.println(value);
        }

        for (String key : map.keySet()) {  // 모든 키값을 순차적으로 반환
            System.out.println(key);
        }
         */

        System.out.println("orderedMenu = " + orderedMenu);
        return "주문이 접수되었습니다.";
    }

    // 사장 - 메뉴 추가
    public Menu save(Menu menu){
        /* 예상 요청 메세지 JSON 형식
        {
            "foodName" : "김치볶음밥",
            "price" : 8000
        }
        */
        if (menu.getId() == null){
            menu.setId(++menuCount);
        }
        menuList.add(menu);  // Menu(id=4, foodName=김치볶음밥, price=8000)를 리스트에 추가
        return menu;
    }

    // 사장 - 메뉴 삭제
    public String deleteByFood(String deleteFoodName){
        Iterator<Menu> iterator = menuList.iterator();
        while(iterator.hasNext()){
            Menu menu = iterator.next();
            if(menu.getFoodName().equals(deleteFoodName)){  // 문자열 객체가 아니라 내용을 비교하려면 `.equals` 메소드를 쓸 것.
                iterator.remove();
                return "Delete OK";
            }
        }
        return null;
    }
}
