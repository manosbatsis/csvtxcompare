package com.github.manosbatsis.csvtxcompare.missmatches.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * {@inheritDoc}
 */
@Entity
@Data
@NoArgsConstructor
public class ClientMarkoffFile extends MarkoffFile {

	@JsonIgnore
	@OneToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, updatable = false, unique = true)
	private MarkoffFilesComparison markoffFilesComparison;

	@Builder
	public ClientMarkoffFile(String id, Integer totalRecords, MarkoffFilesComparison markoffFilesComparison, List<MismatchedRecord> mismatches) {
		super(id, totalRecords, mismatches);
		this.markoffFilesComparison = markoffFilesComparison;
	}

	public ClientMarkoffFile(String id, Integer totalRecords, List<MismatchedRecord> mismatches) {
		super(id, totalRecords, mismatches);
	}
}
