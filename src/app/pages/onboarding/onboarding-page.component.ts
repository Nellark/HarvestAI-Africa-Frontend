import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-onboarding-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatSlideToggleModule,
  ],
  template: `
    <div class="onboarding">
      <section class="header-card">
        <div>
          <p class="eyebrow">Onboarding</p>
          <h1>Set up your farm workspace.</h1>
          <p>
            Share farm basics once and HarvestAI Africa will tailor recommendations for your crop,
            climate, and connectivity profile.
          </p>
        </div>
        <div class="progress-card">
          <mat-icon>flag</mat-icon>
          <div>
            <strong>8 steps</strong>
            <span>Estimated setup time: 6 minutes</span>
          </div>
        </div>
      </section>

      <div class="layout">
        <mat-card class="step-card">
          <mat-stepper linear="false" class="premium-stepper">
            <mat-step label="Farm size">
              <div class="step-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Farm size</mat-label>
                  <input matInput placeholder="3.5 hectares" />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Land tenure</mat-label>
                  <mat-select>
                    <mat-option value="owned">Owned</mat-option>
                    <mat-option value="leased">Leased</mat-option>
                    <mat-option value="shared">Shared</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
              <div class="actions">
                <button mat-flat-button color="primary" matStepperNext>Continue</button>
              </div>
            </mat-step>

            <mat-step label="Location">
              <div class="step-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Country</mat-label>
                  <mat-select>
                    <mat-option value="south-africa">South Africa</mat-option>
                    <mat-option value="kenya">Kenya</mat-option>
                    <mat-option value="nigeria">Nigeria</mat-option>
                    <mat-option value="ghana">Ghana</mat-option>
                    <mat-option value="zambia">Zambia</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Province / state</mat-label>
                  <input matInput placeholder="Limpopo" />
                </mat-form-field>
              </div>
              <div class="actions">
                <button mat-stroked-button matStepperPrevious>Back</button>
                <button mat-flat-button color="primary" matStepperNext>Continue</button>
              </div>
            </mat-step>

            <mat-step label="Language">
              <div class="chip-card">
                <mat-chip-set>
                  <mat-chip selected>English</mat-chip>
                  <mat-chip>Swahili</mat-chip>
                  <mat-chip>French</mat-chip>
                  <mat-chip>Portuguese</mat-chip>
                  <mat-chip>Arabic</mat-chip>
                </mat-chip-set>
              </div>
              <div class="actions">
                <button mat-stroked-button matStepperPrevious>Back</button>
                <button mat-flat-button color="primary" matStepperNext>Continue</button>
              </div>
            </mat-step>

            <mat-step label="Crop types">
              <div class="chip-grid">
                <button class="choice-card" type="button">
                  <mat-icon>grass</mat-icon>
                  <strong>Maize</strong>
                </button>
                <button class="choice-card" type="button">
                  <mat-icon>spa</mat-icon>
                  <strong>Beans</strong>
                </button>
                <button class="choice-card" type="button">
                  <mat-icon>eco</mat-icon>
                  <strong>Tomatoes</strong>
                </button>
                <button class="choice-card" type="button">
                  <mat-icon>water_drop</mat-icon>
                  <strong>Spinach</strong>
                </button>
              </div>
              <div class="actions">
                <button mat-stroked-button matStepperPrevious>Back</button>
                <button mat-flat-button color="primary" matStepperNext>Continue</button>
              </div>
            </mat-step>

            <mat-step label="Livestock">
              <div class="step-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Livestock focus</mat-label>
                  <mat-select>
                    <mat-option value="none">None</mat-option>
                    <mat-option value="cattle">Cattle</mat-option>
                    <mat-option value="goats">Goats</mat-option>
                    <mat-option value="poultry">Poultry</mat-option>
                    <mat-option value="mixed">Mixed</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Estimated headcount</mat-label>
                  <input matInput placeholder="24" />
                </mat-form-field>
              </div>
              <div class="actions">
                <button mat-stroked-button matStepperPrevious>Back</button>
                <button mat-flat-button color="primary" matStepperNext>Continue</button>
              </div>
            </mat-step>

            <mat-step label="Connectivity">
              <div class="switch-list">
                <mat-slide-toggle checked>Internet available most days</mat-slide-toggle>
                <mat-slide-toggle checked>Offline caching required</mat-slide-toggle>
                <mat-slide-toggle>Low data mode</mat-slide-toggle>
              </div>
              <div class="actions">
                <button mat-stroked-button matStepperPrevious>Back</button>
                <button mat-flat-button color="primary" matStepperNext>Continue</button>
              </div>
            </mat-step>

            <mat-step label="Water">
              <div class="step-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Water source</mat-label>
                  <mat-select>
                    <mat-option value="borehole">Borehole</mat-option>
                    <mat-option value="river">River</mat-option>
                    <mat-option value="dam">Dam</mat-option>
                    <mat-option value="rainfed">Rain-fed</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Irrigation method</mat-label>
                  <input matInput placeholder="Drip irrigation" />
                </mat-form-field>
              </div>
              <div class="actions">
                <button mat-stroked-button matStepperPrevious>Back</button>
                <button mat-flat-button color="primary" matStepperNext>Continue</button>
              </div>
            </mat-step>

            <mat-step label="Experience">
              <div class="switch-list">
                <mat-chip-set>
                  <mat-chip selected>Beginner</mat-chip>
                  <mat-chip>Intermediate</mat-chip>
                  <mat-chip>Experienced</mat-chip>
                </mat-chip-set>
              </div>
              <div class="actions">
                <button mat-stroked-button matStepperPrevious>Back</button>
                <button mat-flat-button color="primary" (click)="finishSetup()">Finish setup</button>
              </div>
            </mat-step>
          </mat-stepper>
        </mat-card>

        <aside class="summary-column">
          <mat-card class="summary-card">
            <p class="eyebrow">Your workspace</p>
            <h2>What HarvestAI will use</h2>
            <div class="summary-list">
              <article>
                <mat-icon>location_on</mat-icon>
                <div>
                  <strong>Location</strong>
                  <span>South Africa · Limpopo</span>
                </div>
              </article>
              <article>
                <mat-icon>grass</mat-icon>
                <div>
                  <strong>Main crops</strong>
                  <span>Maize, beans, tomatoes</span>
                </div>
              </article>
              <article>
                <mat-icon>wifi_off</mat-icon>
                <div>
                  <strong>Offline strategy</strong>
                  <span>Cached recommendations and queued uploads</span>
                </div>
              </article>
            </div>
          </mat-card>

          <mat-card class="summary-card accent">
            <p class="eyebrow">AI prep</p>
            <h3>After setup, the app can personalize:</h3>
            <ul>
              <li>Disease detection thresholds</li>
              <li>Crop recommendation ranking</li>
              <li>Weather alerts for your province</li>
              <li>Yield forecast confidence bands</li>
            </ul>
          </mat-card>
        </aside>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
      padding: 1rem;
      background:
        radial-gradient(circle at top left, rgba(200, 227, 106, 0.18), transparent 30%),
        radial-gradient(circle at bottom right, rgba(46, 125, 50, 0.12), transparent 32%),
        var(--color-background);
    }

    .onboarding {
      max-width: 1360px;
      margin: 0 auto;
      display: grid;
      gap: 1rem;
    }

    .header-card,
    .step-card,
    .summary-card {
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.84);
      border: 1px solid rgba(229, 231, 235, 0.9);
      box-shadow: var(--shadow-card);
      backdrop-filter: blur(14px);
    }

    .header-card {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: end;
      padding: 1.25rem 1.35rem;
    }

    .eyebrow {
      margin: 0 0 0.35rem;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font-size: 0.7rem;
      color: var(--color-secondary);
      font-weight: 700;
    }

    .header-card h1,
    .summary-card h2,
    .summary-card h3 {
      margin: 0;
      font: 700 clamp(1.8rem, 3vw, 2.8rem) / 1.06 'Poppins', sans-serif;
    }

    .header-card p,
    .summary-card li,
    .summary-card span {
      margin: 0.5rem 0 0;
      color: var(--color-secondary);
      line-height: 1.7;
    }

    .progress-card {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      padding: 1rem 1.1rem;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(46, 125, 50, 0.12), rgba(200, 227, 106, 0.18));
    }

    .progress-card mat-icon {
      color: var(--color-primary);
    }

    .layout {
      display: grid;
      grid-template-columns: minmax(0, 1.45fr) minmax(300px, 0.55fr);
      gap: 1rem;
      align-items: start;
    }

    .step-card {
      padding: 0.5rem;
    }

    .premium-stepper {
      background: transparent;
    }

    .step-grid,
    .switch-list,
    .chip-card,
    .chip-grid {
      display: grid;
      gap: 0.8rem;
    }

    .step-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .chip-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .choice-card {
      display: grid;
      justify-items: start;
      gap: 0.5rem;
      padding: 1rem;
      border-radius: 22px;
      border: 1px solid var(--color-border);
      background: #fff;
      color: var(--color-text);
      cursor: pointer;
      transition: transform 180ms ease, box-shadow 180ms ease;
      text-align: left;
    }

    .choice-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-card);
    }

    .choice-card mat-icon {
      color: var(--color-primary);
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .summary-column {
      display: grid;
      gap: 1rem;
    }

    .summary-card {
      padding: 1.25rem;
    }

    .summary-list {
      display: grid;
      gap: 0.9rem;
      margin-top: 1rem;
    }

    .summary-list article {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.75rem;
      align-items: start;
      padding: 1rem;
      border-radius: 18px;
      background: rgba(248, 249, 245, 0.9);
    }

    .summary-list mat-icon {
      color: var(--color-primary);
      margin-top: 0.15rem;
    }

    .accent {
      background: linear-gradient(135deg, rgba(27, 67, 50, 0.98), rgba(46, 125, 50, 0.92));
      color: #fff;
    }

    .accent .eyebrow,
    .accent li {
      color: rgba(255, 255, 255, 0.82);
    }

    @media (max-width: 960px) {
      .layout {
        grid-template-columns: 1fr;
      }
      .summary-column {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 720px) {
      :host {
        padding: 0.5rem;
      }
      .header-card {
        flex-direction: column;
        align-items: start;
      }
      .step-grid,
      .chip-grid,
      .summary-column {
        grid-template-columns: 1fr;
      }
      .actions {
        justify-content: stretch;
        flex-wrap: wrap;
      }
      .actions button {
        flex: 1;
      }
    }
  `,
})
export class OnboardingPageComponent {
  private readonly router = inject(Router);

  protected finishSetup(): void {
    this.router.navigate(['/app/dashboard']);
  }
}
