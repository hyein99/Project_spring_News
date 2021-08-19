package com.sparta.finalproject.service;

import com.sparta.finalproject.models.Keyword;
import com.sparta.finalproject.models.KeywordRepository;
import com.sparta.finalproject.models.KeywordRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class KeywordService {
    private final KeywordRepository keywordRepository;

    @Transactional
    public Long update(Long id, KeywordRequestDto requestDto){
        Keyword keyword = keywordRepository.findById(id).orElseThrow(
                () -> new NullPointerException("아이디가 존재하지 않습니다.")
        );
        keyword.update(requestDto);
        return id;
    }
}
