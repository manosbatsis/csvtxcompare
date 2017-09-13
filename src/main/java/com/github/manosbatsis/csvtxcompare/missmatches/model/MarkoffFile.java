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

import lombok.AllArgsConstructor;
import lombok.Data;
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
public class MarkoffFile {

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid2")
	private String id;

	@Column(nullable = false, updatable = false)
	private Integer totalRecords;

	@OneToMany(mappedBy = "markoffFile", fetch = FetchType.EAGER)
	private List<MismatchedRecord> mismatches;

	/**
	 * Default constructor
	 */
	public MarkoffFile() {

	}

}
