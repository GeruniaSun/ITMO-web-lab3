package lt.braineater.itmo.web3.utils;

import java.util.List;

public class Validator {
    private static final double MAXIMUM_X = 5;
    private static final double MINIMUM_X = -5;

    private static final double MAXIMUM_Y = 5;
    private static final double MINIMUM_Y = -5;

    private static final List<Integer> CORRECT_R = List.of(1, 2, 3, 4, 5);

    public static boolean validateForm(double x, double y, int r){
        return (validateX(x) && validateY(y) && validateR(r));
    }

    private static boolean validateX(double x){
        return (x >= MINIMUM_X && x <= MAXIMUM_X);
    }

    private static boolean validateY(double y){
        return (y >= MINIMUM_Y && y <= MAXIMUM_Y);
    }

    private static boolean validateR(int r){
        return CORRECT_R.contains(r);
    }
}
