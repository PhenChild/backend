Feature: Create all on the system
  An admin user wants to create station, user, variable, schedule, instrument

  Scenario: Admin create Station
    Given Estacion Pichincha, EST001, 999-999-999, photo, liso, OMM
    When enter to the stations page
    Then it will be a station with code "EST001"

  Scenario: Admin create user
    Given Michael, Arce, 999-999-999, micxarce@espol.edu.ec, 1234
    When enter to the new user page
    Then it will be a user with name "Michael Arce"

  Scenario: Admin create variable
    Given Temperatura, Celcius, 100, -273, Float, Temperatura atmosferica
    When enter to the new variable page
    Then it will be a variable with name "Temperatura"
  
  Scenario: Admin create schedule
    Given Parcial, 19:00:00
    When enter to the new schedule page
    Then it will be a schedule with name "Parcial-19:00:00"
  
  Scenario: Admin create instrument
    Given INST001, Barometro, EST001
    When enter to the new instrument page
    Then it will be a instrument with name "INST001"