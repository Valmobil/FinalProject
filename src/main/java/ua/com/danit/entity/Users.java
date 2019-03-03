package ua.com.danit.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long usersId;
    private String usersName;
    private String usersPhone;
//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String usersPassword;
    private String usersMail;
    @OneToMany
    @JoinColumn(name = "carsId")
    private List<Cars> usersCars;
}
