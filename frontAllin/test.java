enum Day {
    MONDAY(1, "tody i can do something");
    private int index;
    private String value;
    Day(int index, String value) {
        this.index = index;
        this.value = value;
    }
    public int getIndex() {
        return index;
    }
    public String getValue() {
        return value;
    }
}

class Student {
    public int name;
}



public class test {
    public static void main(String []args) {
        // Day day = Day.MONDAY;
        // System.out.println(day.getIndex());
        Class c = Student.class;
        System.out.println(c.getName());

    }
}