package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long usersId;
    private String usersName;
    private String usersPhone;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String usersPassword;
    private String usersMail;
//    @OneToMany
//    @JoinColumn(name = "cars_users_Id")
//    private List<Cars> usersCars;
}
