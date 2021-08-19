package com.sparta.finalproject.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    List<Keyword> findAllByOrderByModifiedAtDesc();
}
