@Divine_Essence_Women_Ring
Feature: Divine Essence Women Ring
  As a shopper
  I want to search for a product and choose a size
  So that I can view the product with the selected size

  @smoke
  Scenario Outline: Search for Divine Essence Women Ring with size 5 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "5"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "5"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
     # | Exquisite     | 14KT           | Gold (Natural Diamond)            |
     # | Scintillating | 14KT           | Gold (Natural Diamond)            |
     # | Finest        | 18KT           | Gold (Natural Diamond)            |
     # | Tempting      | 18KT           | Gold (Natural Diamond)            |
     # | Brilliant     | 18KT           | Gold (Natural Diamond)            |
     # | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
     # | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
     # | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
     # | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      #| Charm         | Platinum 950   | Platinum (Natural Diamond)        |
     # | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 6 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "6"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "6"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 7 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "7"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "7"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 8 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "8"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "8"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 9 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "9"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "9"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 10 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "10"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "10"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 11 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "11"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "11"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 12 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "12"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "12"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 13 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "13"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "13"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 14 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "14"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "14"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 15 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "15"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "15"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 16 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "16"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "16"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 17 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "17"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "17"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 18 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "18"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "18"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 19 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "19"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "19"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

  
  Scenario Outline: Search for Divine Essence Women Ring with size 20 and validate variant weights
    Given I open Ringsandi site "https://ringsandi.com/"
    When I search for "Divine Essence Women Ring"
    And I select product "Divine Essence Women Ring"
    And I select size "20"
    And I click on variant option "<Variant>" in "<Category>"
    And I click on the Break-up text on the "<Variant>" variant in "<Category>"
    Then the price breakdown for "Divine Essence Women Ring" is displayed with size "20"
    And I verify Metal weight for "<MetalKT>" is displayed
    And I verify Natural stone weight is displayed

    Examples:
      | Variant       | MetalKT        | Category                          |
      | Delightful    | 14KT           | Gold (Natural Diamond)            |
      | Exquisite     | 14KT           | Gold (Natural Diamond)            |
      | Scintillating | 14KT           | Gold (Natural Diamond)            |
      | Finest        | 18KT           | Gold (Natural Diamond)            |
      | Tempting      | 18KT           | Gold (Natural Diamond)            |
      | Brilliant     | 18KT           | Gold (Natural Diamond)            |
      | Radiant       | 14KT           | Lab Grown (Gold & Platinum)       |
      | Luminous      | 18KT           | Lab Grown (Gold & Platinum)       |
      | Pristine      | Platinum 950   | Lab Grown (Gold & Platinum)       |
      | Grace         | Platinum 950   | Platinum (Natural Diamond)        |
      | Charm         | Platinum 950   | Platinum (Natural Diamond)        |
      | Elegance      | Platinum 950   | Platinum (Natural Diamond)        |

