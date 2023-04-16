package com.capstone.design;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor  // Menu 객체 그냥 생성 시에 필요.
@AllArgsConstructor  // Menu 객체에 파라미터 넣어서 생성 시에 필요.
public class Menu {
    private Integer id;
    private String foodName;
    private Integer price;

    /* 예상 요청 메세지 JSON 형식
    {
        "foodName" : "김치볶음밥",
        "price" : 8000
    }
     */
}
