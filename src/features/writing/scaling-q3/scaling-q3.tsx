/* eslint-disable react/no-unescaped-entities */
import Image, { type StaticImageData } from "next/image";
import { Aside } from "@/features/writing/aside";
import fig1 from "./fig1.png";
import fig2 from "./fig2.png";
import fig3 from "./fig3.png";
import fig4 from "./fig4.png";
import fig5 from "./fig5.png";
import fig6 from "./fig6.png";
import fig7 from "./fig7.png";

const external = { target: "_blank", rel: "noopener noreferrer" };

function Fig({ src, n, children }: { src: StaticImageData; n: number; children: React.ReactNode }) {
  return (
    <figure>
      <Image src={src} alt={`Figure ${n}`} sizes="(min-width: 40rem) 37rem, 100vw" />
      <figcaption>
        <strong>Figure {n}.</strong> {children}
      </figcaption>
    </figure>
  );
}

// Each paragraph stays on one line: JSX drops the space at a line break next to a tag.
export function ScalingQ3() {
  return (
    <>
      <h2>TLDR:</h2>
      <ul>
        <li><strong>Ablating Q3 and Q4 activations in Qwen3-1.7B breaks the model</strong> and partial ablation at 25% increases CoT length and decreases accuracy on GSM8K</li>
        <li><strong>Scaling Q3 activations has a causal relationship with CoT length</strong>, increasing the scale factor causes shorter CoT and decreasing scale factor lengthens CoT. Accuracy is stable up to 1.5x scale up with shorter CoT. Q4 activations have a similar but weaker pattern.</li>
        <li><strong>Scaling Q3 activations has a direct relationship with the model's urge to stop or continue thinking</strong>, the expected value of end-thinking tokens grows with respect to the scale of the Q3 activations. The expected value of continue-thinking tokens shrinks with respect to the scale of Q3 activations.</li>
        <li><strong>Forcing the model to continue thinking does not restore/improve accuracy</strong> in both the intact and Q3 scaled versions of the model.</li>
      </ul>

      <h2>Intro &amp; Background</h2>
      <p>Most open-weight LLMs today use SwiGLU, which can activate positively or negatively and are categorized in four ways depending on the up-projection and gate activations: Q1 (up-proj +, gate +), Q2 (up-proj -, gate +), Q3 (up-proj -, gate -), and Q4 (up-proj +, gate -). For more background read the <a href="https://www.goodfire.com/research/neurons-as-an-interpretable-basis" {...external}>Goodfire post</a>!</p>
      <Fig src={fig1} n={1}>Sampled on every MLP neuron in Qwen3-1.7B on every token of the intact model's GSM8K reasoning (24 problems, 18,042 thinking tokens, all 28 layers, 3.1 billion firings).</Fig>
      <p>In their experiments with Qwen3.6-35B-A3B, Goodfire found some interesting properties of Q3 activations in which ablating all Q3 activations reduces reasoning length and patching these activations back "restored both reasoning and accuracy". This led to some questions posed around the properties of Q3 activations namely: What impacts do changing Q3 activations have on reasoning and loss? What are the emergent patterns that come through when editing Q3 activations and what could that tell us about the effect Q3 activations have on the model? How much does accuracy deteriorate in relation to reasoning reduction?</p>

      <h2>Setup</h2>
      <p>I used Q4 activations as a control throughout testing as they nearly mirror Q3 activations in terms of the percentage of total activations (~15% each) and firings (~40% each). Both are weaker, smaller activations that are abundant, Q4 are negative activations and Q3 are positive activations. The tests were ran on a dense Qwen3-1.7B model as opposed to the sparser MoE model used in the Goodfire experiments, this may change the behavior of Q3 activations since the neurons might be more polysemantic in this denser smaller model. The model consists of 28 layers and 6,144 neurons per layer. The intact Qwen3-1.7B model had a baseline accuracy of 84% on GSM8K with thinking on (matched to correct answer numerically), with a median thinking length of 1,365 tokens where 11% of responses hit a 4096-token cap on thinking. I use a 4096-token cap similarly to Goodfire to place a ceiling on time spent in the testing runs. All edited model runs were paired with an intact model running the same prompt and problem set.</p>

      <h2>Results</h2>
      <p>In trying to replicate the full Q3 ablation results on the smaller scale and denser Qwen3-1.7B model, I found that the model consistently breaks when ablating the Q3 activations to the mean of all activations or to zero; however, when setting the activations to the mean for the quadrant activations (referred to as qmean ablation) accuracy holds well compared to the intact model. This holds true for Q4 activations as well. Additionally when doing full qmean ablation, the next-token prediction (tested with loss from the intact model with WikiText) holds up as well.</p>
      <p>When setting Q3 activations to the mean, 39/50 responses emit nothing whereas setting Q4 activations to the mean show 48/50 responses loop until they hit the 4096-token cap. There is some more digging to be done here on exactly what implications this has for these categories of activations and their effects on the model. Both edited models have an accuracy of 0 within these tests. When zeroing the activations, both Q3 and Q4 collapse and split between the two (no answer/loop) and come up with an accuracy of 0. Therefore in some further testing with setting activations to mean/to zero, only a portion of activations are ablated to have some coherent results rather than complete collapse of the model.</p>
      <Fig src={fig2} n={2}><strong>Mean/zero ablating a quadrant breaks the model but qmean ablation (setting activations to the average of the respective quadrant) keeps performance.</strong> Ran on GSM8K thinking on (first 50 problems, seed 1). Damage = WikiText loss increase vs intact (thinking off).</Fig>
      <p>To set up a basis for how much can be ablated before the denser Qwen3-1.7B model breaks completely, some preliminary tests were done with MMLU and WikiText to see how far the model can be pushed before it collapses. The results are shown here:</p>
      <Fig src={fig3} n={3}><strong>Damage from zeroing a share of Q3 or Q4 firings.</strong> (a) WikiText loss increase and (b) MMLU accuracy (n = 300 questions) for Qwen3-1.7B with thinking off. Bands = ±1 binomial standard error.</Fig>
      <p>Past 50% of firings zeroed, the model's loss begins to increase steeply.</p>
      <p>I also tested Qwen3-1.7B on reasoning at 25% ablation where there wasn't a drastic change in accuracy and loss for more stable testing. When run on GSM8K at 25% ablation, there is a slight decrease in accuracy versus the intact model; however the partially ablated model actually reasons for longer.</p>
      <Fig src={fig4} n={4}>Qwen3-1.7B on GSM8K, thinking on. Each edit is paired with the intact model on the same problems. Bars are 95% confidence intervals, n = 400 questions.</Fig>

      <h3>Scaled quadrant activations</h3>
      <p>Next I experimented with scaling Q3 activations to see its impacts on reasoning length and accuracy. This is where the most clear connection can be found with the behavior of the model and its Q3/Q4 activations. By scaling the Q3 activations, there is a causal relationship with the CoT length of the model's response. Scaling the activations too far on either side (i.e. shrinking/growing by too large a factor) does drop the model accuracy regardless of the CoT length. Additionally, there doesn't seem to be a significant drop off in accuracy until reaching a scale factor of 1.75x.</p>
      <Fig src={fig5} n={5}>GSM8K with thinking on. 200 problems per edited model using same problems as the intact model. Thinking capped at 4096 tokens.</Fig>
      <Fig src={fig6} n={6}>Activation size scaling on 200 GSM8K problems, seed 1. Shaded: 95% confidence interval.</Fig>

      <h3>Probing for propensity</h3>
      <p>Probing for the probability of tokens that indicate a continuation in CoT, i.e. "Wait", "But", etc. can give an empirical representation for Q3 activation scaling on the urge to end or continue thinking for a given problem. A subset of these types of thinking tokens<Aside n={1}>"Wait", "But", "Alternatively", "Hmm", "Maybe", "maybe", "check", "verify", "confirm"</Aside> is measured for the propensity of the edited model to continue thinking. Likewise, the token for the beginning of the final answer block is used to measure the propensity to end thinking. The probe feeds the saved CoT of the intact model for the responses through the edited models in order to read the next-token probabilities at every position. By summing the probabilities of reopening reasoning and ending thinking along the CoT of the intact model read through the respective edited models' lenses, the expected value of each can be derived. Since the CoT is from the intact model, any changes in those expected values come from the edited model itself. A caveat here though is that the intact model has a very small "urge to end" at all points but second-guesses itself ~16 times per CoT, therefore the "urge to continue thinking" is much more stable.</p>
      <Fig src={fig7} n={7}><strong>Urge to end and urge to continue thinking under activation scaling</strong> on two separate sets of traces. Lines = mean ratio to the intact model; shaded = 95% confidence interval.</Fig>
      <p>The difference between Q4 and Q3 activations is best shown here, with divergent behaviors in the propensity to end thinking on scaled activations. In their behaviors for continuation of thinking, Q4 and Q3 activations seem to follow the same curve up until hitting the intact baseline where Q4 hits a sort of floor at the baseline with the urge to continue while Q3 continues to decline. This reflects earlier behavior on GSM8K where Q4 seems to follow a similar trajectory as Q3 but seems to have less drastic swings towards longer/shorter CoT.</p>

      <h3>Forced continuation of thinking</h3>
      <p>By replacing the {"</think>"} token in the CoT with "Wait" the model can be forced to continue thinking. This forced continuation of thinking does not seem to have a correlation with accuracy of the model, however most of this extended CoT boils down to repetition instead of meaningful changes in approach or thought. Still, this does show that just forcing the model to think longer does not have a restoring effect on the accuracy of the 1.75x scaled Q3 model.</p>
      <div className="post-table">
        <table>
          <thead>
            <tr>
              <th>Run</th>
              <th>Median thinking tokens</th>
              <th>Times forced to continue</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Intact</td><td>1,365</td><td>0</td><td>84.5%</td></tr>
            <tr><td>Intact, forced to continue (control)</td><td>2,332</td><td>5.9</td><td>84.0%</td></tr>
            <tr><td>Q3 ×1.75</td><td>475</td><td>0</td><td>69.5%</td></tr>
            <tr><td>Q3 ×1.75, forced to continue</td><td>1,684</td><td>8.3</td><td>68.5%</td></tr>
          </tbody>
        </table>
      </div>
      <p className="post-note">Each ran on 200 GSM8K problems, seed 1</p>

      <h2>Limitations, Discussion, &amp; Future Work</h2>
      <p>Due to limitations in compute, these tests were only ran on a smaller Qwen3-1.7B model which has much higher neuron density than the sparsified MoE Qwen3.6-35B-A3B model the original Goodfire experiments were run on. Additionally, because of the token cap at 4096, some longer CoT reasoning runs may have lower accuracies than reality and just never finished thinking. Higher sparsity in larger models most likely also has a significant impact on the behavior of Q3 and Q4 activations.</p>
      <p>Most experiments were ran on one seed and ran only once. Measuring CoT in this way does not actually measure the amount of reasoning the model has, only the length of the text in the model's CoT which is a useful but not faithful proxy to measure actual reasoning.</p>
      <p>I would love to see more work on the reasoning behind this behavior in Q3 and Q4 activations and understanding why scaling over this large portion of activations causally affects CoT length.</p>
      <p>My working hypothesis is that as the model learns on Q3 activations, it allocates control over CoT or other thinking parameters that are not relevant to the problem at hand onto the activations that have been gated out and do not have significant individual outputs that change the meaning in the representation space of the token; kind of like an <a href="https://arxiv.org/pdf/2406.16254" {...external}>entropy neuron</a> signal which carries control and no content. Thus increasing or decreasing the entire quadrant of Q3 or Q4 activations end up changing external propensities in the model that are not related to the context such as the CoT, and there may be more behaviors that this affects.</p>
      <p>Since the variation from token to token of individual activations in Q3/Q4 neurons doesn't seem to have an effect on the capabilities of the model (see qmean ablation in fig 2), the activations themselves seem to hold little token-specific information. This could mean that the entire Q3 activation space is used to encode some outer parameters for the model, i.e. CoT length instead of encoding specific information regarding the current token.</p>
    </>
  );
}
