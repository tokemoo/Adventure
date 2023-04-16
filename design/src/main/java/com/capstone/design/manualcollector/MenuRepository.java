package com.capstone.design.manualcollector;

import com.capstone.design.Menu;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MenuRepository {
    private static MenuRepository menuRepository = new MenuRepository();
    private static List<Menu> menuList = new ArrayList<>(); // 메뉴판 DB

    static {
        menuList.add(new Menu(1, "김치볶음밥", 8000));
        menuList.add(new Menu(2, "떡볶이", 7000));
        menuList.add(new Menu(3, "자장면", 6000));
    }

    private static Map<String, Integer> orderedMenu = new HashMap<String, Integer>();  // 손님이 주문한 메뉴 구성 DB <음식 이름, 음식 개수>.
    // 음식 가격의 경우는 따로 DB에서 내부적으로 관리할 생각이다. 이 데이터는 외부에서 받을 필요가 없으니까.

    private MenuRepository(){}

    public static MenuRepository getInstance(){
        return menuRepository;
    }

    public List<Menu> getMenuList(){
        return menuList;
    }

    public static void setOrderedMenu(String orderMenu, Integer numberOfFood) {
        orderedMenu.put(orderMenu, numberOfFood);
        System.out.println("orderedMenu = " + orderedMenu);
    }
}
