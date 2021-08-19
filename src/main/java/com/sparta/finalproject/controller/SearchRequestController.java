package com.sparta.finalproject.controller;

import com.sparta.finalproject.models.NewsDto;
import com.sparta.finalproject.utils.NaverNewsSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class SearchRequestController {

    private final NaverNewsSearch naverNewsSearch;

    @GetMapping("api/search")
    public List<NewsDto> getItems(@RequestParam String query){
        String resultString = naverNewsSearch.search(query);
        return naverNewsSearch.fromJSONtoItems(resultString);
    }
}
