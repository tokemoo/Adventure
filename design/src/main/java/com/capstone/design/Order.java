package com.capstone.design;

import lombok.Data;

import java.util.List;

@Data
public class Order {
    private List<String> foodName;
    private List<Integer> numberOfFood;

    /* 예상 요청 메세지 JSON 형식
    {
        "foodName" : ["김치볶음밥", "자장면"],
        "numberOfFood" : [2, 1]
    }
     */
}
