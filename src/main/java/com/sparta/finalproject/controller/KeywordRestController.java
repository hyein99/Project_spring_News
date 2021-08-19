package com.sparta.finalproject.controller;

import com.sparta.finalproject.models.Keyword;
import com.sparta.finalproject.models.KeywordRepository;
import com.sparta.finalproject.models.KeywordRequestDto;
import com.sparta.finalproject.service.KeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class KeywordRestController {

    private final KeywordRepository keywordRepository;
    private final KeywordService keywordService;

    // Create
    @PostMapping("/api/keyword")
    public Keyword createKeyword(@RequestBody KeywordRequestDto requestDto){
        Keyword keyword = new Keyword(requestDto);
        return keywordRepository.save(keyword);
    }

    // Read
    @GetMapping("/api/keyword")
    public List<Keyword> readKeyword(){
        return keywordRepository.findAllByOrderByModifiedAtDesc();
    }

    // Update(Service에서 진행)
    @PutMapping("/api/keyword/{id}")
    public Long updateKeyword(@PathVariable Long id, @RequestBody KeywordRequestDto requestDto){
        keywordService.update(id, requestDto);
        return id;
    }

    // Delete
    @DeleteMapping("/api/keyword/{id}")
    public Long deleteKeyword(@PathVariable Long id){
        keywordRepository.deleteById(id);
        return id;
    }
}
