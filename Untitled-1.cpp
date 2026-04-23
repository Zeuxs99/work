#include <iostream>
using namespace std;

void getput();

int main()
{
    cout << "Please enter a line of text:\n";
    getput();
    cout << "\nBye bye!" << endl;
    return 0;
}

void getput()
{
    char c;
    if (cin.get(c) && c != '\n')
    {
        cout.put(c);   // print now
        getput();      // then read/print the rest
    }
}
