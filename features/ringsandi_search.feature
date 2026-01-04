Feature: Ringsandi Search and Size Selection
  As a shopper
  I want to search for a product and choose a size
  So that I can view the product with the selected size

  
    
    Scenario Outline: Search for Divine Essence Women Ring with size 18 and validate variant weights
      Given I open Ringsandi site "https://ringsandi.com/"
      When I search for "Divine Essence Women Ring"
      And I select product "Divine Essence Women Ring"
      And I select size "18"
      And I click on variant option "<Variant>" in "<Category>"
      And I click on the Break-up text on the "<Variant>" variant in "<Category>"
      Then the price breakdown for "Divine Essence Women Ring" is displayed with size "18"
      And I verify Metal weight for "<MetalKT>" is displayed correctly
      And I verify Solitaire stone weight is displayed correctly

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

    
   