package com.sparta.finalproject.utils;

import com.sparta.finalproject.models.NewsDto;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Component
public class NaverNewsSearch {

    public String search(String query) {
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Naver-Client-Id", "mW347rNSk9txl_XArvfK");
        headers.add("X-Naver-Client-Secret", "Jxn5y6S5of");
        String body = "";

        HttpEntity<String> requestEntity = new HttpEntity<String>(body, headers);
        ResponseEntity<String> responseEntity = rest.exchange("https://openapi.naver.com/v1/search/news.json?query="+query, HttpMethod.GET, requestEntity, String.class);
        HttpStatus httpStatus = responseEntity.getStatusCode();
        int status = httpStatus.value();
        String response = responseEntity.getBody();
        System.out.println("Response status: " + status);
        System.out.println(response);

        return response;
    }

    public List<NewsDto> fromJSONtoItems(String result){
        JSONObject rjson = new JSONObject(result);
        JSONArray items = rjson.getJSONArray("items");

        List<NewsDto> newsDtoList = new ArrayList<>();
        for (int i=0; i<items.length(); i++){
            JSONObject itemJson = items.getJSONObject(i);
            NewsDto newsDto = new NewsDto(itemJson);
            newsDtoList.add(newsDto);
        }
        return newsDtoList;
    }

//    public static void main(String[] args){
//        NaverNewsSearch naverNewsSearch = new NaverNewsSearch();
//        String result = naverNewsSearch.search("삼성");
//
//        // 문자열 정보를 JSONObject로 바꾸기
//        JSONObject rjson = new JSONObject(result);
//
//        // JSONObject에서 items 배열 꺼내기
//        JSONArray items = rjson.getJSONArray("items");
//
//        // JSONArray 로 for문 돌기
//        for (int i=0; i<items.length(); i++){
//            JSONObject itemJson = items.getJSONObject(i);
//
//            String title = itemJson.getString("title");
//            String link = itemJson.getString("link");
//            String desc = itemJson.getString("description");
//            String pubdate = itemJson.getString("pubDate");
////            System.out.println(title);
//        }
//    }
}