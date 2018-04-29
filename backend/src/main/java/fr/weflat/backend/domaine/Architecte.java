package fr.weflat.backend.domaine;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "architecte")
public class Architecte extends Utilisateur {

	public Architecte() {
		super();
	}

	@Column(nullable = true, name = "web_site")
    private String webSite;
	
	@Column(nullable = true, name = "architects_order")
	private boolean architectsOrder;
	
	@Column(nullable = true, name = "cfai")
	private boolean cfai;
	
	@Column(nullable = true, name = "professional_responsibility")
	private boolean professionalResponsibility;
	
	@Column(nullable = true, name = "decennial_insurance")
	private boolean decennialInsurance;
	
	@Column(nullable = true, name = "motivation")
	private String motivation;
	
	@Column(nullable = true, name = "practicing_since")
	private Date practicingSince;
	
	@Column(nullable = true, name = "status")
	private int status;
	
	@Column(nullable = true, name = "cgu")
	private boolean cgu;
	
	@Column(nullable = true, name = "iban")
	private String iban;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "id_architect_situation", nullable = true)
	private ArchitectSituation situation;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "id_architect_type", nullable = true)
	private ArchitectType type;
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "architecte_zip_code", joinColumns = @JoinColumn(name = "id_architecte", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "id_zip_code", referencedColumnName = "id"))
	private Set<ZipCode> zipCodes;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "architecte")
	private Set<Visite> visites;
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "architecte_visite", joinColumns = @JoinColumn(name = "id_architecte", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "id_visite", referencedColumnName = "id"))
	private Set<Visite> potentialVisites;

	public Set<Visite> getPotentialVisites() {
		return potentialVisites;
	}

	public void setPotentialVisites(Set<Visite> potentialVisites) {
		this.potentialVisites = potentialVisites;
	}

	public Set<Visite> getVisites() {
		return visites;
	}

	public void setVisites(Set<Visite> visites) {
		this.visites = visites;
	}

	public Set<ZipCode> getZipCodes() {
		return zipCodes;
	}

	public void setZipCodes(Set<ZipCode> zipCodes) {
		this.zipCodes = zipCodes;
	}

	public String getWebSite() {
		return webSite;
	}

	public void setWebSite(String webSite) {
		this.webSite = webSite;
	}

	public boolean isArchitectsOrder() {
		return architectsOrder;
	}

	public void setArchitectsOrder(boolean architectsOrder) {
		this.architectsOrder = architectsOrder;
	}

	public boolean isCfai() {
		return cfai;
	}

	public void setCfai(boolean cfai) {
		this.cfai = cfai;
	}

	public boolean isProfessionalResponsibility() {
		return professionalResponsibility;
	}

	public void setProfessionalResponsibility(boolean professionalResponsibility) {
		this.professionalResponsibility = professionalResponsibility;
	}

	public boolean isDecennialInsurance() {
		return decennialInsurance;
	}

	public void setDecennialInsurance(boolean decennialInsurance) {
		this.decennialInsurance = decennialInsurance;
	}

	public String getMotivation() {
		return motivation;
	}

	public void setMotivation(String motivation) {
		this.motivation = motivation;
	}

	public Date getPracticingSince() {
		return practicingSince;
	}

	public void setPracticingSince(Date practicingSince) {
		this.practicingSince = practicingSince;
	}

	public ArchitectType getType() {
		return type;
	}

	public void setType(ArchitectType type) {
		this.type = type;
	}

	public ArchitectSituation getSituation() {
		return situation;
	}

	public void setSituation(ArchitectSituation situation) {
		this.situation = situation;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public boolean isCgu() {
		return cgu;
	}

	public void setCgu(boolean cgu) {
		this.cgu = cgu;
	}
	
	public String getIban() {
		return iban;
	}

	public void setIban(String iban) {
		this.iban = iban;
	}
}
