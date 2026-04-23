
#include <iostream>
#include <iomanip> // For formatting the output

using namespace std;

// Function 1: Calculated using a loop (Iterative)
long double factorialLoop(unsigned int n) {
    long double result = 1.0;
    for (unsigned int i = 1; i <= n; ++i) {
        result *= i;
    }
    return result;
}

// Function 2: Calculated recursively
long double factorialRecursive(unsigned int n) {
    if (n <= 1) {
        return 1.0;
    }
    return n * factorialRecursive(n - 1);
}

int main() {
    cout << setw(5) << "n" << setw(25) << "Factorial of n" << endl;
    cout << "------------------------------------------" << endl;

    // Set fixed notation and remove trailing zeros for clean output
    cout << fixed << setprecision(0);

    for (unsigned int i = 0; i <= 20; ++i) {
        // You can use either function here; they will yield the same result
        cout << setw(5) << i << setw(25) << factorialLoop(i) << endl;
    }

    return 0;
}