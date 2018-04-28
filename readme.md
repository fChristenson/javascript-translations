# Javascript translations

## What we will cover

* An example of how we can do client side translations
* Some basic things to consider when handling translations
* An example of how you can build your own translation solution

## Notes

A common use case for international applications is to allow a user
to change the language on a page.

Personally I believe that the server should handle translations as
a rule as the system very rarely can avoid mixing language knowledge
in to the server code.

The example I will show you is a way to create a simple translation
module in vanilla Javascript that works for most common translation
cases but if you need something more elaborate there are well
maintained libraries that handle more complex use cases.
