package com.github.manosbatsis.csvtxcompare.missmatches.repository;

import com.github.manosbatsis.csvtxcompare.missmatches.model.MarkoffFilesComparison;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Typical repository interface for {@link MarkoffFilesComparison} entities.
 * Implementation is automatically generated by Spring
 * Created by manos on 12/9/2017.
 */
@Repository
public interface MarkoffFilesComparisonRepository
		extends JpaRepository<MarkoffFilesComparison, String>,
		JpaSpecificationExecutor<MarkoffFilesComparison> {
}