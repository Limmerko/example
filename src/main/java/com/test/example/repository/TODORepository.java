package com.test.example.repository;

import com.test.example.domain.TODO;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TODO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TODORepository extends JpaRepository<TODO, Long> {
}
