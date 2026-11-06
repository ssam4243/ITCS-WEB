// Scripted call scenarios. Outcomes are held locally; no external action is performed.
export const industries = [
  {
    "id": "shop",
    "label": "Ecommerce",
    "business": "Your online shop",
    "intro": "From a delivery question to a difficult conversation.",
    "cases": [
      {
        "id": "tracking",
        "label": "Track an order",
        "context": "A customer calls about an overdue delivery.",
        "summary": "Delivery update request",
        "steps": [
          {
            "reply": "Hello, I’m Alison. Thanks for calling. I can help you find out where your delivery is. Could I take your order reference first, please? You’ll usually find it at the top of your confirmation email.",
            "options": [
              "My reference is HH-1042."
            ],
            "facts": [
              [
                "Enquiry",
                "Delivery tracking"
              ]
            ]
          },
          {
            "reply": "Lovely, thank you. And could you confirm the delivery postcode for me? I’ll just check that I’m looking at the right order before we go through the details.",
            "options": [
              "The postcode is CF10 1AA."
            ],
            "facts": [
              [
                "Order",
                "HH-1042"
              ],
              [
                "Check",
                "Postcode confirmed"
              ]
            ]
          },
          {
            "reply": "Thank you, I’ve found it. It’s the desk lamp, and the latest delivery update is tomorrow between ten and twelve. I know it’s frustrating when something takes longer than expected. Would you like an update by email, or would you prefer someone from customer care to give you a ring?",
            "options": [
              "Please request a delivery update by email.",
              "Please ask the team to call me."
            ],
            "facts": [
              [
                "Item",
                "Desk lamp"
              ],
              [
                "Delivery",
                "Tomorrow · 10am–12pm"
              ]
            ]
          },
          {
            "reply": "Of course. I’ve noted your preference alongside the order details and the delivery window, so customer care has everything together. They can take it from here without you having to explain it all again. Is there anything else you’d like me to include?",
            "options": [],
            "facts": [
              [
                "Handover",
                "Customer care"
              ],
              [
                "Status",
                "Update request prepared"
              ]
            ]
          }
        ]
      },
      {
        "id": "complaint",
        "label": "Handle a complaint",
        "context": "A damaged delivery needs a calm response and a clear handover.",
        "summary": "Complaint handover",
        "steps": [
          {
            "reply": "Hello, I’m Alison. Thanks for getting in touch. I understand something’s gone wrong with your delivery. Let’s work through it together. Could you tell me what happened?",
            "options": [
              "My lamp arrived with a cracked shade."
            ],
            "facts": [
              [
                "Enquiry",
                "Damaged item"
              ]
            ]
          },
          {
            "reply": "I’m sorry to hear that. You were expecting a lamp you could use, and it’s arrived damaged. I’ll make sure the team has a clear picture of what’s happened. Could I take your order reference, please?",
            "options": [
              "The order reference is HH-1042."
            ],
            "facts": [
              [
                "Issue",
                "Cracked lampshade"
              ],
              [
                "Priority",
                "Customer complaint"
              ]
            ]
          },
          {
            "reply": "Thank you, I’ve got the order. Would a replacement be your preference, or would you rather ask the team about a refund? I’ll include that in the handover so they can look at the right option for you straight away.",
            "options": [
              "I’d prefer a replacement.",
              "Please ask the team to review a refund."
            ],
            "facts": [
              [
                "Order",
                "HH-1042"
              ],
              [
                "Action",
                "Record preferred resolution"
              ]
            ]
          },
          {
            "reply": "Thank you. I’ve put the cracked shade, your order reference and your preferred resolution together in one note. Customer care will need to confirm the arrangement with you, but they’ll have the background before they get in touch. You shouldn’t need to start from the beginning.",
            "options": [],
            "facts": [
              [
                "Handover",
                "Customer care review"
              ],
              [
                "Status",
                "Complaint summary prepared"
              ]
            ]
          }
        ]
      },
      {
        "id": "return",
        "label": "Start a return",
        "context": "Capture the details before the customer care team reviews a return.",
        "summary": "Return review request",
        "steps": [
          {
            "reply": "Hello, I’m Alison. You’d like to return something? Of course, I can help get that started. Could I take your order reference first, please?",
            "options": [
              "My reference is HH-1042."
            ],
            "facts": [
              [
                "Enquiry",
                "Return request"
              ]
            ]
          },
          {
            "reply": "Thank you. I’ve found the desk lamp on that order. Could you tell me a little about why you’d like to return it? That will help me point the team towards the right next step.",
            "options": [
              "It doesn’t suit the room.",
              "I ordered the wrong item."
            ],
            "facts": [
              [
                "Order",
                "HH-1042"
              ],
              [
                "Item",
                "Desk lamp"
              ]
            ]
          },
          {
            "reply": "Understood, thanks for explaining. Is the lamp unused and still in its original packaging? If you’re unsure about anything, that’s absolutely fine. I can include your question for the returns team rather than make you guess.",
            "options": [
              "Yes, it is unused and packaged.",
              "I need advice about the condition."
            ],
            "facts": [
              [
                "Action",
                "Check item condition"
              ],
              [
                "Policy",
                "Business review required"
              ]
            ]
          },
          {
            "reply": "Right, I’ve got the item, your reason for returning it and the details about its condition. The returns team can check those against the policy and explain the instructions. I’ll keep everything together so they can give you a useful answer, rather than ask you the same questions again.",
            "options": [],
            "facts": [
              [
                "Handover",
                "Returns team"
              ],
              [
                "Status",
                "Return review prepared"
              ]
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "property",
    "label": "Estate agency",
    "business": "Your estate agency",
    "intro": "Give every property enquiry a useful next step.",
    "cases": [
      {
        "id": "viewing",
        "label": "Arrange a viewing",
        "context": "A prospective buyer wants to see a property.",
        "summary": "Viewing enquiry",
        "steps": [
          {
            "reply": "Hello, I’m Alison. Thanks for calling. Are you looking to arrange a viewing? Tell me which property caught your eye and I’ll take a few details for the agent.",
            "options": [
              "The two-bedroom flat on Example Road."
            ],
            "facts": [
              [
                "Enquiry",
                "Property viewing"
              ]
            ]
          },
          {
            "reply": "The two-bedroom flat on Example Road. Lovely. Could you tell me a little about your situation? Are you buying your first home, or do you have a property to sell? It helps the agent understand what you’re looking for before you meet.",
            "options": [
              "I’m buying my first home.",
              "I’m moving and have a property to sell."
            ],
            "facts": [
              [
                "Property",
                "Example Road · two-bedroom flat"
              ],
              [
                "Team",
                "Residential sales"
              ]
            ]
          },
          {
            "reply": "Thank you, that’s helpful. Would Tuesday at ten in the morning or Wednesday at half past three suit you better? I’ll put your preferred time with the enquiry, and the agent can check it with the seller before confirming.",
            "options": [
              "Tuesday at 10am would suit me.",
              "Wednesday at 3.30pm would be better."
            ],
            "facts": [
              [
                "Action",
                "Capture preferred viewing time"
              ],
              [
                "Booking",
                "Agent confirmation required"
              ]
            ]
          },
          {
            "reply": "Lovely, I’ve got everything together: Example Road, your buying position and the time that suits you. The agent will have those details ready when they follow up to confirm the viewing. If there’s anything particular you’d like to ask about the property, they can cover that with you too.",
            "options": [],
            "facts": [
              [
                "Handover",
                "Sales agent"
              ],
              [
                "Status",
                "Viewing request prepared"
              ]
            ]
          }
        ]
      },
      {
        "id": "valuation",
        "label": "Request a valuation",
        "context": "Turn a new seller enquiry into a useful brief for the agent.",
        "summary": "Valuation lead",
        "steps": [
          {
            "reply": "Hello, I’m Alison. Thanks for calling. Are you thinking about selling your property, or are you looking for a rental valuation? I can take a few details and help get you to the right person.",
            "options": [
              "I’m considering selling.",
              "I’d like a rental valuation."
            ],
            "facts": [
              [
                "Enquiry",
                "Property valuation"
              ]
            ]
          },
          {
            "reply": "Of course. Could you tell me where the property is and what sort of property it is? Just a brief description is fine for now. The agent can go through the finer details when you speak.",
            "options": [
              "A three-bedroom house in Cardiff.",
              "A two-bedroom flat in Swansea."
            ],
            "facts": [
              [
                "Action",
                "Capture property requirements"
              ]
            ]
          },
          {
            "reply": "Thank you, that gives us a good starting point. Would you prefer a quick telephone conversation first, or would you like to discuss a visit to the property? There’s no need to have everything decided at this stage.",
            "options": [
              "Please arrange an initial callback.",
              "I’d like to discuss a property visit."
            ],
            "facts": [
              [
                "Service",
                "Valuation consultation"
              ],
              [
                "Availability",
                "To be confirmed by agent"
              ]
            ]
          },
          {
            "reply": "That’s all noted. The valuation team will have your plans, the property details and your preferred next step together. They can talk you through the process and agree a suitable time with you. You’ll be speaking to someone who already understands why you called.",
            "options": [],
            "facts": [
              [
                "Handover",
                "Valuation team"
              ],
              [
                "Status",
                "New enquiry prepared"
              ]
            ]
          }
        ]
      },
      {
        "id": "property-callback",
        "label": "Follow up an enquiry",
        "context": "Help a returning caller reach the right person without starting again.",
        "summary": "Agent callback brief",
        "steps": [
          {
            "reply": "Hello, I’m Alison. Thanks for calling. Have you already been speaking with someone at the agency, or is this a new enquiry? I’ll help you pick up with the right person.",
            "options": [
              "I’m following up with the sales team."
            ],
            "facts": [
              [
                "Enquiry",
                "Existing property enquiry"
              ]
            ]
          },
          {
            "reply": "Of course. Which property is it about? If it’s following a viewing, just let me know which one and I’ll keep that with your message for the sales team.",
            "options": [
              "It’s about the Example Road viewing."
            ],
            "facts": [
              [
                "Property",
                "Example Road"
              ],
              [
                "Team",
                "Residential sales"
              ]
            ]
          },
          {
            "reply": "Example Road, thank you. Would you like to leave some feedback from the viewing, or would you prefer the agent to give you a ring about the next step? A little context will help them prepare before they call.",
            "options": [
              "Please ask the agent to call me.",
              "I’d like to leave viewing feedback."
            ],
            "facts": [
              [
                "Action",
                "Capture reason for follow-up"
              ]
            ]
          },
          {
            "reply": "Thank you, I’ve got the property and the reason for your call together for the sales team. They’ll be able to pick up the conversation with the background in front of them. If you have any further questions in the meantime, we can keep those with the same enquiry.",
            "options": [],
            "facts": [
              [
                "Handover",
                "Sales team callback"
              ],
              [
                "Status",
                "Follow-up brief prepared"
              ]
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "support",
    "label": "IT & professional services",
    "business": "Your service business",
    "intro": "Gather the right detail. Get it to the right people.",
    "cases": [
      {
        "id": "it-issue",
        "label": "Log an IT issue",
        "context": "An office caller needs help with an everyday IT problem.",
        "summary": "Support intake",
        "steps": [
          {
            "reply": "Hello, I’m Alison. Thanks for calling. Tell me what’s happening and I’ll take the details for the support team. You won’t need to share any passwords with me.",
            "options": [
              "Our office printer is unavailable."
            ],
            "facts": [
              [
                "Enquiry",
                "IT support request"
              ]
            ]
          },
          {
            "reply": "The office printer isn’t available. Understood. Is that just on your computer, or are other people having the same problem? That helps the engineer understand how widely it’s affecting the office.",
            "options": [
              "It affects the whole office.",
              "It only affects my computer."
            ],
            "facts": [
              [
                "Issue",
                "Printer unavailable"
              ],
              [
                "Action",
                "Establish business impact"
              ]
            ]
          },
          {
            "reply": "Thank you. Can you carry on with your essential work, or is there a particular job that’s being held up? For instance, printing invoices or dispatch paperwork. I’ll make sure the business impact is clear in the request.",
            "options": [
              "We can work, but cannot print invoices.",
              "It is holding up an urgent task."
            ],
            "facts": [
              [
                "Service",
                "Office printing"
              ],
              [
                "Priority",
                "Support team to assess"
              ]
            ]
          },
          {
            "reply": "Right, I’ve got the printer issue, who it’s affecting and the work it’s holding up. That gives the service desk a clear starting point when they assess the request. They’ll decide the priority and the right engineer to help, with your context already to hand.",
            "options": [],
            "facts": [
              [
                "Handover",
                "IT service desk"
              ],
              [
                "Status",
                "Support intake prepared"
              ]
            ]
          }
        ]
      },
      {
        "id": "ticket",
        "label": "Chase a support request",
        "context": "Give a returning caller a clear update and a structured next step.",
        "summary": "Support follow-up",
        "steps": [
          {
            "reply": "Hello, I’m Alison. Thanks for calling. Are you following up on a support request? If you have the ticket reference handy, I can help you pick up from there.",
            "options": [
              "My reference is IT-2048."
            ],
            "facts": [
              [
                "Enquiry",
                "Existing support request"
              ]
            ]
          },
          {
            "reply": "Thank you. I’ve found the reference. It’s currently awaiting an engineer’s review. Have you called for an update, or has something changed since you last spoke to the team?",
            "options": [
              "I’d like an update.",
              "The issue now affects another colleague."
            ],
            "facts": [
              [
                "Reference",
                "IT-2048"
              ],
              [
                "Current status",
                "Awaiting engineer review"
              ]
            ]
          },
          {
            "reply": "Of course, I’ll include that. Would you prefer someone to give you a ring, or would an update through your usual support channel be easier? I’ll make sure the team knows how you’d like to hear back.",
            "options": [
              "Please request a callback.",
              "Please use our usual support channel."
            ],
            "facts": [
              [
                "Action",
                "Record follow-up preference"
              ]
            ]
          },
          {
            "reply": "That’s all together now: your ticket reference, the reason you called and your preferred way to hear back. The person handling the request can review it alongside the existing information. You won’t have to open a separate enquiry just to keep the team up to date.",
            "options": [],
            "facts": [
              [
                "Handover",
                "Existing ticket owner"
              ],
              [
                "Status",
                "Follow-up note prepared"
              ]
            ]
          }
        ]
      },
      {
        "id": "new-starter",
        "label": "Prepare a new starter",
        "context": "Collect a clear brief before the team provisions access.",
        "summary": "New starter brief",
        "steps": [
          {
            "reply": "Hello, I’m Alison. You’re getting ready for a new colleague? Lovely. What do you need help arranging? I can take the initial details so the team has a clear brief.",
            "options": [
              "A laptop and access for a new colleague."
            ],
            "facts": [
              [
                "Enquiry",
                "New starter requirements"
              ]
            ]
          },
          {
            "reply": "A laptop and access, of course. What sort of role will they be doing, and when are they due to start? That will help the team plan the equipment and check the right requirements with their manager.",
            "options": [
              "An office role, starting next month."
            ],
            "facts": [
              [
                "Equipment",
                "Laptop requested"
              ],
              [
                "Start",
                "Next month"
              ]
            ]
          },
          {
            "reply": "Thank you. Will they be based in the office, or working between home and the office? It’s useful to know that early so the team can think about the right setup, rather than just the laptop itself.",
            "options": [
              "They’ll work in the office.",
              "They’ll work between home and the office."
            ],
            "facts": [
              [
                "Approval",
                "Authorised manager required"
              ],
              [
                "Action",
                "Capture working arrangement"
              ]
            ]
          },
          {
            "reply": "Lovely, I’ve got the equipment, role, start timing and working arrangement together. The team can check the approvals and licences with the authorised manager, then agree the setup. It gives everyone a clearer starting point for getting your new colleague ready for their first day.",
            "options": [],
            "facts": [
              [
                "Handover",
                "IT onboarding team"
              ],
              [
                "Status",
                "Requirements brief prepared"
              ]
            ]
          }
        ]
      }
    ]
  }
];
export const allCases=industries.flatMap(x=>x.cases);
