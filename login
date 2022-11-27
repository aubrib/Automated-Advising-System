#include <iostream>
#include <ctype.h>
#include <string.h>
using namespace std;
int main() 
{
 
  string name;
  string password;
  cout << "\nEnter a user name: ";
  cin >> name;

  cout << "\nEnter a password that meets the following rules:\n";
  while(true) //Loop continues till the user enter a correct password
  {
      cout << "\nMust be atleast 9 characters (The letter 'A' followed by the 8 digits after)";
      cout << "\nMust contain atleast 1 uppercase letter";
      cout << "\nMust contain atleast 1 number";
      cout << "\nPassword:\n";
      cin >> password;
 
      // Counters for the requirements
      int numChar = 0;
      int upper = 0;
      int num = 0;
      bool isValid = false;
       
      // Checking for the validity.
      numChar = password.length();
      for(int i=0;i<numChar;i++)
      {
          if(isupper(password[i]))
              upper++;
          if(isdigit(password[i]))
              num++;
      }
 
      if(numChar >= 6 && upper > 0 && num > 0)
          break;
      else
          continue;
  }
  
  cout << "\nUsername: "<<name;
  cout << "\nPassword: ";
  for(int i=0;i<password.length();i++) //Print * depending upon the length of the password
      cout<<"*";
 
  return 0;
}
