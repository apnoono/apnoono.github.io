package github.io.game;

import javax.swing.JFrame;
import java.awt.*;
import java.awt.image.BufferStrategy;

public class Game extends JFrame{
    private Canvas canvas = new Canvas();

    public Game() {

        //forces program to shutdown when JFrame window is closed
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        //Puts the JFrame in the center of screen
        setLocationRelativeTo(null);
        setBounds(0,0, 1000, 800);
        add(canvas);

        setVisible(true);

        canvas.createBufferStrategy(3);
        BufferStrategy bufferStrategy = canvas.getBufferStrategy();

    }

//    public void paint(Graphics graphics) {
//        super.paint(graphics);
//        graphics.setColor(Color.red);
//        graphics.fillOval(200, 200, 50, 50);
//    }

    public static void main(String[] args) {
        new Game();
    }
}