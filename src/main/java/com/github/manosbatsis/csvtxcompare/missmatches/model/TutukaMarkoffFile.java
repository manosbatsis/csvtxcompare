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
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * {@inheritDoc}
 */
@Entity
@Data
@NoArgsConstructor
public class TutukaMarkoffFile extends MarkoffFile {

	@JsonIgnore
	@OneToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, updatable = false, unique = true)
	private MarkoffFilesComparison markoffFilesComparison;

	/**
	 * Used as hint to lombok's {@link Builder}
	 */
	@Builder
	public TutukaMarkoffFile(String id, Integer totalRecords, String fileName, Long fileSize, List<MarkoffRecord> mismatches, List<MarkoffRecord> records, MarkoffFilesComparison markoffFilesComparison) {
		super(id, totalRecords, fileName, fileSize, mismatches, records);
		this.markoffFilesComparison = markoffFilesComparison;
	}

	@Override
	public String toString() {
		return new ToStringBuilder(this)
				.appendSuper(super.toString())
				.toString();
	}

}
