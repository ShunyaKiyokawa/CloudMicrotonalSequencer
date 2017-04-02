package com.microtonal.memo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class AppController {
	@RequestMapping("/")
	public String index() {
	return "index";
	}
	@RequestMapping("/BootStrap")
	public String bootstrap() {
	return "BootStrapSample";
	}
	@RequestMapping("/SampleJS")
	public String SampleJS() {
	return "SampleJS";
	}
	@RequestMapping("/SampleJQuery")
	public String SampleJQuery() {
	return "SampleJQuery";
	}
	@RequestMapping(value="/testindex", method=RequestMethod.GET)
	public ModelAndView testindex(ModelAndView mav) {
		mav.setViewName("testindex");
		mav.addObject("msg","お名前を書いて送信してください。");
		return mav;
	}
	@RequestMapping(value="/testindex", method=RequestMethod.POST)
	public ModelAndView testsend(@RequestParam("text1")String str,
	ModelAndView mav) {
		mav.addObject("msg","こんにちは、" + str + "さん！");
		mav.addObject("value",str);
		mav.setViewName("testindex");
		return mav;
	}
	@RequestMapping(value = "/sequencer/{edo}", method = RequestMethod.GET)
	public ModelAndView SequencerGET(@PathVariable int edo, ModelAndView mav) {
		mav.setViewName("sequencer");
		mav.addObject("nEdoValueString", "1414");
		mav.addObject("nEdoValueInt", "edo="+edo);
		mav.addObject("nEdoValueInt", 15);
		mav.addObject("msg","this is sample content.");
		return mav;
	}
	@RequestMapping(value = "/sequencer/{edo}", method = RequestMethod.POST)
	public ModelAndView SequencerPOST( ModelAndView mov) {
		mov = new ModelAndView("redirect:/sequencer");
		return mov;
	}
}
