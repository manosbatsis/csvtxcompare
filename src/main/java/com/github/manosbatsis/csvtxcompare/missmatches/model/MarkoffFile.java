package com.github.manosbatsis.csvtxcompare.missmatches.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.hibernate.annotations.GenericGenerator;

/**
 * Our persisted entity interpretation of a markoff file,
 * used mainly to group mismatches
 *
 * Created by manos on 12/9/2017.
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@AllArgsConstructor
public abstract class MarkoffFile {

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid2")
	private String id;

	@Column(nullable = false, updatable = false)
	private Integer totalRecords;

	@Column(nullable = false, updatable = false)
	private String fileName;

	@Column(nullable = false, updatable = false)
	private Long fileSize;

	@OneToMany(mappedBy = "markoffFile", fetch = FetchType.EAGER)
	private List<MarkoffRecord> mismatches;

	@Transient
	private List<MarkoffRecord> records;

	/**
	 * Default constructor
	 */
	public MarkoffFile() {

	}

	@Override
	public String toString() {
		return new ToStringBuilder(this)
				.append("fileName", this.getFileName())
				.append("fileSize", this.getFileSize())
				.append("totalRecords", this.getTotalRecords())
				.append("mismatches", this.getMismatches())
				.toString();
	}

	/**
	 * Set the records count before persisting since the original records will be discarded
	 */
	@PrePersist
	public void prePersist() {
		if (CollectionUtils.isNotEmpty(this.getRecords())) {
			this.setTotalRecords(this.getRecords().size());
			this.setRecords(null);
		}
		else {
			this.setTotalRecords(0);
		}
	}

	public abstract void setMarkoffFilesComparison(MarkoffFilesComparison comparison);

	public abstract MarkoffFilesComparison getMarkoffFilesComparison();

}
