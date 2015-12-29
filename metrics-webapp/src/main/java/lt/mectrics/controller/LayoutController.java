package lt.mectrics.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Povka on 2015.12.29.
 */
@Controller
@RequestMapping(value = "/layout")
public class LayoutController {

    @RequestMapping(method = RequestMethod.GET)
    public String entryPoint() {
        return "index";
    }
}
