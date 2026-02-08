package com.githubActions.test;

public class prime {
    public static void main(String[] args) {
        int num = 4;
        boolean isPrime = true;

        for (int i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                isPrime = false;
                break;
            }
        }
        if(isPrime)
            System.out.println(" is a prime number.");
        else
            System.out.println(" is not a prime number.");
    }
}
