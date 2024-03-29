import List "mo:base/List";
import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat32 "mo:base/Nat32";
import Int "mo:base/Int";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Map "mo:base/HashMap";
import Nat "mo:base/Nat";

actor HastaneRandevu {

  type WeekDay = { #mon; #tue; #wed; #thu; #fri };
  var WorkingHours : [Text] = ["9 am", "10 am", "11 am.", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm"];
  type UserRoles = { #admin; #hospital; #doctor; #patient };

  //--------------------------------------------------------------------------------------
  // USERS
  // Kullanıcı Listesi
  type User = {
    role : UserRoles;
    id : Nat32;
    name : Text;
    password : Text; // to encrypt
  };

  // func natHash(n : Nat) : Hash.Hash {
  //   Text.hash(Nat.toText(n));
  // };

  // var userList = Map.HashMap<Nat, User>(0, Nat.equal, natHash);

  // public func login(name : Text, password : Text) : async ?User {
  //   if (name == "" or password == "") {
  //     // Handle empty username or password
  //     return null;
  //   } else {
  //     for (user in userList.vals()) {
  //       if(name == user.name and user.password == password) {
  //          return ?user;
  //       };
  //     };

  //     return null;
  //   };

  // };

  //--------------------------------------------------------------------------------------
  // APPOINTMENTS
  // Randevu tipi
  type Appointment = {
    patientId : Nat32;
    id : Nat32;
    patientName : Text;
    doctor : Doctor;
    date : Text;
  };
  // Randevuları saklamak için trie  Text id ile Randevu listesi
  var appointmentTrie : Trie.Trie<Nat32, Appointment> = Trie.empty();

  //--------------------------------------------------------------------------------------
  // DOCTOR
  type Doctor = {
    id : Nat32;
    name : Text;
    major : Major;
    appointmentList : [Appointment];
  };

  // Doktorlar listesi , Text id ile Doktor listesi
  var doctorTrie : Trie.Trie<Nat32, Doctor> = Trie.empty();
  //--------------------------------------------------------------------------------------
  // HOSPITAL
  type Hospital = {
    name : Text;
    adress : Text;
    doctorList : [Doctor];
  };
  //--------------------------------------------------------------------------------------
  // MAJOR
  type Major = {
    id : Nat32;
    name : Text;
  };

  private stable var majorTrie : Trie.Trie<Nat32, Major> = Trie.empty();

  //--------------------------------------------------------------------------------------
  //create a key
  private func key(x : Nat32) : Trie.Key<Nat32> { { hash = x; key = x } };

  //--------------------------------------------------------------------------------------
  //FUNCTIONS
  // MAJOR
  // Delete a Major
  public func deleteMajor(majorId : Nat32) : async Bool {

    let result = Trie.find(majorTrie, key(majorId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      majorTrie := Trie.replace(majorTrie, key(majorId), Nat32.equal, null).0;
    };
    exists;
  };

  // create Major
  public func addMajor(major : Major) : async ?Major {
    var majorId : Nat32 = major.id;
    majorTrie := Trie.replace(majorTrie, key(majorId), Nat32.equal, ?major).0;
    return ?major;
  };

  // get all majors
  public query func getAllMajors() : async [Major] {
    var allMajorList : [Major] = [];
    let iter = Trie.iter(majorTrie);

    for ((k, v) in iter) {
      allMajorList := [v];
    };
    return allMajorList;
  };

  // update major
  public func updateMajor(major : Major) : async Bool {
    var majorId : Nat32 = major.id;
    let majorResult = Trie.find(majorTrie, key(majorId), Nat32.equal);
    let exists = Option.isSome(majorResult); // true false
    if (exists) {
      majorTrie := Trie.replace(
        majorTrie,
        key(majorId),
        Nat32.equal,
        ?major,
      ).0;
    };
    return exists;
  };

  //--------------------------------------------------------------------------------------
  // get all Doctors
  public query func getAllDoctors() : async [Doctor] {
    var allDoctorList : [Doctor] = [];
    let iter = Trie.iter(doctorTrie);

    for ((k, v) in iter) {
      allDoctorList := [v];
    };
    return allDoctorList;
  };

  // create Doctor
  public func addDoctor(doctor : Doctor) : async ?Doctor {
    var doctorId : Nat32 = doctor.id;
    doctorTrie := Trie.replace(doctorTrie, key(doctorId), Nat32.equal, ?doctor).0;
    return ?doctor;
  };

  // Delete Doctor
  public func deleteDoctor(doctorId : Nat32) : async Bool {
    let result = Trie.find(doctorTrie, key(doctorId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      doctorTrie := Trie.replace(doctorTrie, key(doctorId), Nat32.equal, null).0;
    };
    exists;
  };

  // update Doctor
  public func updateDoctor(doctor : Doctor) : async Bool {
    var doctorId : Nat32 = doctor.id;
    let doctorResult = Trie.find(doctorTrie, key(doctorId), Nat32.equal);
    let exists = Option.isSome(doctorResult); // true false
    if (exists) {
      doctorTrie := Trie.replace(
        doctorTrie,
        key(doctorId),
        Nat32.equal,
        ?doctor,
      ).0;
    };
    return exists;
  };

  //--------------------------------------------------------------------------------------
  // APPOINTMENTS

  // search Major and get corresponding Doctors - will be used in Speciality/Majors page listing doctors
  public query func searchMajorGetDoctorList(major : Major) : async [Doctor] {
    var majorId : Nat32 = major.id;
    let majorResult = Trie.find(majorTrie, key(majorId), Nat32.equal);
    let exists = Option.isSome(majorResult);
    if (exists) {
      var correspondingDoctorList : [Doctor] = [];
      let iter = Trie.iter(doctorTrie);
      for ((_, doctor) in iter) {
        if (doctor.major == major) {
          correspondingDoctorList := [doctor];
        };
      };
      return correspondingDoctorList;
    } else {
      return [];
    };
  };

  // add appointment
  public func addAppointment(appointment : Appointment) : async ?Appointment {
    var appointmentId : Nat32 = appointment.id;
    appointmentTrie := Trie.replace(appointmentTrie, key(appointmentId), Nat32.equal, ?appointment).0;

    // add a new record to doctors appointment list

    return ?appointment;
  };

  // get all appointments
  public query func getAllAppointments() : async [Appointment] {
    var allAppointmentList : [Appointment] = [];
    let iter = Trie.iter(appointmentTrie);

    for ((k, v) in iter) {
      allAppointmentList := [v];
    };
    return allAppointmentList;
  };

};
