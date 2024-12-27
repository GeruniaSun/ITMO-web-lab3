package lt.braineater.itmo.web3.beans;

import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lt.braineater.itmo.web3.model.Attempt;
import lt.braineater.itmo.web3.utils.Calculator;
import lt.braineater.itmo.web3.utils.Validator;
import lt.braineater.itmo.web3.utils.DatabaseManager;
import org.primefaces.event.SlideEndEvent;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import java.util.Map;
import java.util.logging.Logger;
//TODO изоляция транзакций
//TODO транзакции

@Named("formBean")
@SessionScoped
public class FormBean implements Serializable {

    private static final Logger logger = Logger.getLogger(FormBean.class.getName());
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

    @Inject
    private DatabaseManager databaseManager;

    private final List<Attempt> attempts = new ArrayList<>();
    private float x;
    private float y;
    private int r;
    private boolean hit;

    public String submit() {
        if (Validator.validateForm(x, y, r)) {
            Attempt attempt = new Attempt(x, y, r, Calculator.calcHit(x, y, r), currentTime());
            databaseManager.addAttempt(attempt);
            attempts.add(0, attempt);
            logger.info("Attempt hit: " + attempt.getHit());
        }
        return null;
    }

    public void addFromJS() {
        final Map<String, String> params = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();
        params.values().forEach(System.out::println);

        try {
            float x = Float.parseFloat(params.get("x"));
            float y = Float.parseFloat(params.get("y"));
            int r = Integer.parseInt(params.get("r"));

            Boolean hit = Calculator.calcHit(x, y, r);

            final Attempt attempt = new Attempt(x, y, r, hit, currentTime());

            databaseManager.addAttempt(attempt);
            attempts.add(0, attempt);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            System.out.println(e.getLocalizedMessage());
        }
    }

    public void onSlideEndR(SlideEndEvent event) {
        this.y = (float) event.getValue();
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public int getR() {
        return r;
    }

    public void setR(int r) {
        this.r = r;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public List<Attempt> getAttempts() {
        return attempts;
    }

    private String currentTime() {
        return LocalDateTime.now().format(DATE_TIME_FORMATTER);
    }
}